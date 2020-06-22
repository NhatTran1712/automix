export type KeyValueArray<TKey, TValue> = KeyValue<TKey, TValue>[]

export type KeyValue<TKey, TValue> = {
  key: TKey
  value: TValue
}

export abstract class KeyValueClass<K, V> implements KeyValue<K, V> {
  public key!: K

  public value!: V
}
