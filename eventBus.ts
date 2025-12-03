type EventHandler<T> = (event: T) => void;
type EventBusOptions = { processCurrentEventOnSubscribe?: boolean };

interface ISubscription {
    unsubscribe(): void;
}

interface IEventBus<T extends { name: string }> {
    fire(event: T): void;
    subscribe(eventName: string, eventHandler: EventHandler<T>): ISubscription;
    unsubscribe(eventName: string): void;
}

class Subscription<T extends { name: string }> implements ISubscription {
    private eventName: string;
    private eventBus: IEventBus<T>;

    constructor(eventBus: IEventBus<T>, key: string) {
        this.eventBus = eventBus;
        this.eventName = key;
    }

    unsubscribe() {
        this.eventBus.unsubscribe(this.eventName);
    }
}

class EventBus<T extends { name: string }> implements IEventBus<T> {
    private eventHandlers: Map<string, Array<EventHandler<T>>> = new Map();
    private options: EventBusOptions;

    // The code is updated with following flag to reduce cases of async subscriptions to events
    private isFiring: boolean = false;
    public static defaultEventBusOptions: EventBusOptions = {
        processCurrentEventOnSubscribe: false,
    };

    constructor(options: EventBusOptions = EventBus.defaultEventBusOptions) {
        this.options = options;
    }

    fire(event: T): void {
        this.isFiring = true;
        const eventHandlers = this.eventHandlers.get(event.name) || [];

        eventHandlers.forEach((eventHandler) => {
            try {
                eventHandler(event);
            } catch (error) {
                console.error(`Error in event handler for event '${String(event)}':`, error);
            }
        });
        this.isFiring = false;
    }

    subscribe(eventName: string, eventHandler: EventHandler<T>): ISubscription {
        const existingEventHandlers = this.eventHandlers.get(eventName) || [];
        const updatedEventHandlers = [...existingEventHandlers, eventHandler];

        if (!this.isFiring || this.options.processCurrentEventOnSubscribe) {
            this.eventHandlers.set(eventName, updatedEventHandlers);
        } else {
            setTimeout(() => this.eventHandlers.set(eventName, updatedEventHandlers));
        }

        return new Subscription<T>(this, eventName);
    }

    unsubscribe(eventName: string): void {
        this.eventHandlers.delete(eventName);
    }
}

const sleep = async (delay: number) => new Promise((resolve) => setTimeout(resolve, delay));

const main = async () => {
    const eventBus = new EventBus<{
        name: string;
        value: number;
    }>({
        processCurrentEventOnSubscribe: true,
    });

    eventBus.subscribe('oddClickEvent', (event) => console.log('oddClickEvent', event));
    eventBus.subscribe('evenClickEvent', (event) => console.log('evenClickEvent', event));
    eventBus.subscribe('tenClickEvent', (event) => console.log('tenClickEvent', event));

    for (let i = 0; i < 100; i++) {
        if (i % 10 === 0) {
            eventBus.fire({
                name: 'tenClickEvent',
                value: i,
            });
        } else if (i % 2 === 0) {
            eventBus.fire({
                name: 'evenClickEvent',
                value: i,
            });
        } else if (i % 2 === 1) {
            eventBus.fire({
                name: 'oddClickEvent',
                value: i,
            });
        }

        await sleep(1000);
    }
};

main();
