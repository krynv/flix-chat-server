import { formatError } from "graphql";
import formatErrors from '../formatErrors';

export default {
    Mutation: {
        createGroup: async (parent, args, { models, user }) => {
            try {
                await models.Group.create({ ...args, owner: user.id });
                return {
                    ok: true,

                };
            } catch (err) {
                console.log(err);
                return {
                    ok: false,
                    errors: formatErrors(err),
                };
            }
        },
    }
};