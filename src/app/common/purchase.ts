import { Address } from "./address";
import { Costumer } from "./costumer";
import { Order } from "./order";
import { OrderItems } from "./order-items";

export class Purchase {

    customer:Costumer;
    shippingAddress: Address;
    billingAddress: Address;
    order:Order;
    orderItems:OrderItems[];
}
