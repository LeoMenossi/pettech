import {Address} from '@/entities/address.entity'
export interface IAddressRepository{
    findAddressByPersinId(
        perosnId: number,
        page: number,
        limit: number,
    ): Promise<Address[]>

    create(address: Address) : Promise<Address | undefined>
}