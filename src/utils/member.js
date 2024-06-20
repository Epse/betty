exports.memberIsBoard = (member) => {
    return member && member.roles.cache.some((r) => r.name === 'Board');
};
