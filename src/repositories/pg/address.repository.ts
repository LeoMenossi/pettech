import { Address } from "@/entities/address.entity";
import { IAddressRepository } from "../address.repository.interface";

export class AddressRepository implements IAddressRepository{
    findAddressByPersinId(perosnId: number, page: number, limit: number): Promise<Address[]> {
        const offset = (page - 1) * limit
    }
    create(address: Address): Promise<Address | undefined> {
        throw new Error("Method not implemented.");
    }
    
}