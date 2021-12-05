interface A {
    a: number,
    b: string
}

interface B {
    b: string,
    c: string
}

export class Person<T,P> {
    protected height: T
    protected name: P
    constructor(height: T, name: P, skill: A&B) {
        this.height = height
        this.name = name
    }
}

new Person<number, string>(1, 'xiaoming', {
    a:1,
    b: '2',
    c: '234234'
})

import { testNameSpace } from './namespace'
new testNameSpace.V().ff()
