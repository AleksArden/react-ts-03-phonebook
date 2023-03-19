export interface IContact {
    name: string,
    number: string,
    id: string,
}
export type NewContact = Pick<IContact, 'name' | 'number'>