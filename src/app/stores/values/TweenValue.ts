//https://github.com/katis/hal-browser/blob/master/src/tween/tweenValue.ts

import { action, observable } from 'mobx'
import * as TWEEN from 'tween.js'
import Tween = TWEEN.Tween
import update = TWEEN.update

const updateAction = action('update tween.js animations', update)

function animate(time: number) {
    requestAnimationFrame(animate)
    updateAction(time)
}

requestAnimationFrame(animate)

export class TweenedValue<T> {
    private tween: Tween | null
    duration = 1000
    @observable running = false

    constructor(public value: T) {
    }

    @action tweenTo(targetValue: T, onComplete?: () => void) {
        if (this.tween) {
            this.tween.stop()
        }
        this.tween = new Tween(this.value)
            .to(targetValue, this.duration)
            .onStart(this.start)
            .onComplete(() => {
                this.complete()
                if (onComplete) {
                    onComplete()
                }
            })
            .start()
    }

    @action start = () => {
        this.running = true
    }

    @action complete = () => {
        this.tween = null
        this.running = false
    }
}

export function tweenedValue<T>(value: T): TweenedValue<T> {
    return new TweenedValue(observable(value))
}