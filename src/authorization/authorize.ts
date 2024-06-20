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
    readonly role: string;

    public constructor(role: string) {
        super();
        this.role = role;
    }

    public allowed(member: GuildMember): boolean {
        return member.roles.cache.some(role => role.name === this.role);
    }
}

export class BoardAuthorization extends RoleAuthorization {
    public type: AuthorizationType = AuthorizationType.Board;

    public constructor() {
        super("Board");
    }
}
