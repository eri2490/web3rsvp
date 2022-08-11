import { Address, ipfs, json } from "@graphprotocol/graph-ts"
import {
  ConfirmedAttendee,
  DepositsPaidOut,
  NesRSVP,
  NewEventCreated
} from "../generated/Web3RSVP/Web3RSVP"
import { Account, RSVP, Confirmation, Event } from "../generated/schema"
import { integer } from "@protofire/subgraph-toolkit"

export function handleConfirmedAttendee(event: ConfirmedAttendee): void {}

export function handleDepositsPaidOut(event: DepositsPaidOut): void {}

export function handleNesRSVP(event: NesRSVP): void {}

export function handleNewEventCreated(event: NewEventCreated): void {
  let newEvent = Event.load(event.params.eventID.toHex());
  if (newEvent == null) {
    newEvent = new Event(event.params.eventID.toHex());
    newEvent.eventID = event.params.eventID;
    newEvent.eventOwner = event.params.creatorAddress;
    newEvent.eventTimestamp = event.params.eventTimestamp;
    newEvent.maxCapacity = event.params.maxCapacity;
    newEvent.deposit = event.params.deposit;
    newEvent.totalRSVPs = integer.ZERO;
    newEvent.totalConfirmedAttendees = integer.ZERO;

    let metadata = ipfs.cat(event.params.eventDataCID + "/data.json");

    if (metadata) {
      const value = json.fromBytes(metadata).toObject();
      if (value) {
        const name = value.get("name");
        const description = value.get("description");
        const link = value.get("link");
        const imagePath = value.get("image");

        if (name) {
          newEvent.name = name.toString();
        }

        if (description) {
          newEvent.description = description.toString();
        }

        if (link) {
          newEvent.link = link.toString();
        }

        if (imagePath) {
          const imageURL = 
            "https://ipfs.io/ipfs" +
            event.params.eventDataCID +
            imagePath.toString();
          newEvent.imageURL = imageURL;
        } else {
          // return a fallback image if no imagePath
          const fallbackURL =
            "https://ipfs.io/ipfs/bafybeibssbrlptcefbqfh4vpw2wlmqfj2kgxt3nil4yujxbmdznau3t5wi/event.png";
          newEvent.imageURL = fallbackURL;
        }
       }
    }
    
    newEvent.save()
  }
}
