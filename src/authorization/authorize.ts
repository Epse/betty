import {GuildMember, Role, User} from "discord.js";

export enum AuthorizationType {
    "Public",
    "Role",
    "Board",
}

export type Authorization =
    | PublicAuthorization
    | RoleAuthorization
    | BoardAuthorization
    ;

abstract class BaseAuthorization {
    public type: AuthorizationType;
    public abstract allowed(member: GuildMember): boolean;
}

export class PublicAuthorization extends BaseAuthorization {
    public type: AuthorizationType = AuthorizationType.Public;
    public allowed(_member: GuildMember): boolean {
        return true;
    }
}

export class RoleAuthorization extends BaseAuthorization {
    public type: AuthorizationType = AuthorizationType.Role;
    readonly roles: string[];

    public constructor(roles: string[]) {
        super();
        this.roles = roles;
    }

    public allowed(member: GuildMember): boolean {
        return member.roles.cache.some(role => this.roles.findIndex(x => x === role.name) !== -1);
    }
}

export class BoardAuthorization extends RoleAuthorization {
    public type: AuthorizationType = AuthorizationType.Board;

    public constructor() {
        super(["Board"]);
    }
}
