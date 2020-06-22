import { fill } from '../../../utils'
import { EventContext } from 'firebase-functions'
import { QueryDocumentSnapshot } from 'firebase-functions/lib/providers/firestore'

export const generate = (snapshot: QueryDocumentSnapshot, context: EventContext): void => {
  console.log(snapshot, context, fill(
    { a: true },
    { a: false },
  ))
}
