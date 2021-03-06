import { EmailAddressResolver, NonEmptyStringResolver } from 'graphql-scalars'
import { RegularExpression } from 'graphql-scalars'

export const password = new RegularExpression('password', /^[A-Za-z]\w{7,15}$/);
//scalars types resolvers used for validations
export const scalars = {
    EmailAddress: EmailAddressResolver,
    NonEmptyString: NonEmptyStringResolver,
    Password: password
}