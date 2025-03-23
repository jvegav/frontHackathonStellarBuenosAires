/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Address,
  Keypair,
  TransactionBuilder,
  nativeToScVal,
  scValToNative,
} from "@stellar/stellar-sdk";
import { SorobanRpc } from "@stellar/stellar-sdk";

const rpcUrl = "https://rpc-futurenet.stellar.org";
const networkPassphrase = "Test SDF Future Network ; October 2022";
const contractId = "CBY3QW7MP6NKYBZLMAFERAGFTY56ARCKJXDLAKYNIQHDCK5KQTLUCFIZ";

const server = new SorobanRpc.Server(rpcUrl, { allowHttp: false });
  export async function readMethod(method: string, args: any[] = []) {
    const spec = await server.getContractSpec(contractId);
    const fnSpec = spec.find((s?: any) => s.type === "function" && s.name === method);
    if (!fnSpec || fnSpec.type !== "function") {
      throw new Error(`Method ${method} not found in contract`);
    }
    const scArgs = fnSpec.inputs.map((input?:any, i?: any) => nativeToScVal(args[i], input.type));
    const response = await server.simulateContractFunction({
      contractId,
      functionName: method,
      args: scArgs,
    });
    return scValToNative(response.result.retVal);
  }
  
  export async function invokeMethod(method: string, args: any[] = [], keypair: Keypair) {
    const account = await server.getAccount(keypair.publicKey());
    const tx = new TransactionBuilder(account, {
      fee: "1000",
      networkPassphrase,
    })
      .addOperation({
        type: "invokeHostFunction",
        function: {
          type: "invokeContract",
          contractId,
          functionName: method,
          args: args.map((arg) => nativeToScVal(arg)),
        },
      })
      .setTimeout(30)
      .build();
  
    tx.sign(keypair);
    return await server.sendTransaction(tx);
  }
  
  // Servicios individuales del contrato:
  
  export async function getTicket(ticketId: number) {
    return await readMethod("get_ticket", [ticketId]);
  }
  
  export async function getOwner(ticketId: number) {
    return await readMethod("get_owner", [ticketId]);
  }
  
  export async function getEventTickets(eventId: number) {
    return await readMethod("get_event_tickets", [eventId]);
  }
  
  export async function getResaleTickets() {
    return await readMethod("get_resale_tickets");
  }
  
  export async function initialize(owner: Address, token: Address, keypair: Keypair) {
    return await invokeMethod("initialize", [owner, token], keypair);
  }
  
  export async function createTicket(eventId: number, price: number, keypair: Keypair) {
    return await invokeMethod("create_ticket", [eventId, price], keypair);
  }
  
  export async function resellTicket(ticketId: number, newPrice: number, keypair: Keypair) {
    return await invokeMethod("resell_ticket", [ticketId, newPrice], keypair);
  }
  
  export async function buyTicket(ticketId: number, buyer: Address, keypair: Keypair) {
    return await invokeMethod("buy_ticket", [ticketId, buyer], keypair);
  }
  export async function connectFreighter(): Promise<string | null> {
    if (!window.freighterApi || !(await window.freighterApi.isConnected())) {
      alert("Freighter no está instalado o habilitado.");
      return null;
    }
  
    try {
      const publicKey = await window.freighterApi.getPublicKey();
      return publicKey;
    } catch (error) {
      console.error("Error al conectar Freighter:", error);
      return null;
    }
  }