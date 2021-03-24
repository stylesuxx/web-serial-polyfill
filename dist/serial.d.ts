/// <reference types="w3c-web-usb" />
/// <reference types="w3c-web-serial" />
declare type ParityType = 'none' | 'even' | 'odd' | 'mark' | 'space';
interface SerialOptions {
    baudRate: number;
    dataBits: number;
    stopBits: number;
    parity: ParityType;
    bufferSize: number;
    rtscts: boolean;
    xon: boolean;
    xoff: boolean;
    xany: boolean;
}
interface SerialOutputSignals {
    dtr?: boolean;
    rts?: boolean;
    brk?: boolean;
}
export declare enum SerialPolyfillProtocol {
    UsbCdcAcm = 0
}
export interface SerialPolyfillOptions {
    protocol?: SerialPolyfillProtocol;
    usbControlInterfaceClass?: number;
    usbTransferInterfaceClass?: number;
}
export interface SerialPortFilter {
    usbVendorId?: number;
    usbProductId?: number;
}
export interface SerialPortRequestOptions {
    filters?: Array<SerialPortFilter>;
    polyfillOptions?: SerialPolyfillOptions;
}
/** a class used to control serial devices over WebUSB */
export declare class SerialPort {
    private polyfillOptions_;
    private device_;
    private controlInterface_;
    private transferInterface_;
    private inEndpoint_;
    private outEndpoint_;
    private serialOptions_;
    private readable_;
    private writable_;
    private outputSignals_;
    /**
     * constructor taking a WebUSB device that creates a SerialPort instance.
     * @param {USBDevice} device A device acquired from the WebUSB API
     * @param {SerialPolyfillOptions} polyfillOptions Optional options to
     * configure the polyfill.
     */
    constructor(device: USBDevice, polyfillOptions?: SerialPolyfillOptions);
    /**
     * Getter for the readable attribute. Constructs a new ReadableStream as
     * necessary.
     * @return {ReadableStream} the current readable stream
     */
    get readable(): ReadableStream<Uint8Array> | null;
    /**
     * Getter for the writable attribute. Constructs a new WritableStream as
     * necessary.
     * @return {WritableStream} the current writable stream
     */
    get writable(): WritableStream<Uint8Array> | null;
    /**
     * a function that opens the device and claims all interfaces needed to
     * control and communicate to and from the serial device
     * @param {SerialOptions} options Optional object containing serial options
     * @return {Promise<void>} A promise that will resolve when device is ready
     * for communication
     */
    open(options?: SerialOptions): Promise<void>;
    /**
     * Closes the port.
     *
     * @return {Promise<void>} A promise that will resolve when the port is
     * closed.
     */
    close(): Promise<void>;
    /**
     * A function that returns properties of the device.
     * @return {SerialPortInfo} Device properties.
     */
    getInfo(): SerialPortInfo;
    /**
     * A function used to change the serial settings of the device
     * @param {object} options the object which carries serial settings data
     * @return {Promise<void>} A promise that will resolve when the options are
     * set
     */
    reconfigure(options: SerialOptions): Promise<void>;
    /**
     * Sets control signal state for the port.
     * @param {SerialOutputSignals} signals The signals to enable or disable.
     * @return {Promise<void>} a promise that is resolved when the signal state
     * has been changed.
     */
    setSignals(signals: SerialOutputSignals): Promise<void>;
    /**
     * Checks the serial options for validity and throws an error if it is
     * not valid
     */
    private validateOptions;
    /**
     * Checks the baud rate for validity
     * @param {number} baudRate the baud rate to check
     * @return {boolean} A boolean that reflects whether the baud rate is valid
     */
    private isValidBaudRate;
    /**
     * Checks the data bits for validity
     * @param {number} dataBits the data bits to check
     * @return {boolean} A boolean that reflects whether the data bits setting is
     * valid
     */
    private isValidDataBits;
    /**
     * Checks the stop bits for validity
     * @param {number} stopBits the stop bits to check
     * @return {boolean} A boolean that reflects whether the stop bits setting is
     * valid
     */
    private isValidStopBits;
    /**
     * Checks the parity for validity
     * @param {string} parity the parity to check
     * @return {boolean} A boolean that reflects whether the parity is valid
     */
    private isValidParity;
    /**
     * sends the options alog the control interface to set them on the device
     * @return {Promise} a promise that will resolve when the options are set
     */
    private setLineCoding;
    /**
     * Takes in an Array Buffer that contains Line Coding according to the USB
     * CDC spec
     * @param {ArrayBuffer} buffer The data structured accoding to the spec
     * @return {object} The options
     */
    private readLineCoding;
}
/** implementation of the global navigator.serial object */
declare class Serial {
    /**
     * Requests permission to access a new port.
     *
     * @param {SerialPortRequestOptions} options
     * @param {SerialPolyfillOptions} polyfillOptions
     * @return {Promise<SerialPort>}
     */
    requestPort(options?: SerialPortRequestOptions, polyfillOptions?: SerialPolyfillOptions): Promise<SerialPort>;
    /**
     * Get the set of currently available ports.
     *
     * @param {SerialPolyfillOptions} polyfillOptions Polyfill configuration that
     * should be applied to these ports.
     * @return {Promise<SerialPort[]>} a promise that is resolved with a list of
     * ports.
     */
    getPorts(polyfillOptions?: SerialPolyfillOptions): Promise<SerialPort[]>;
    /**
     * Attach an event listener.
     *
     * @param {string} event the event to listen for.
     * @param {Function} handleEvent the function to be triggered on the event.
     */
    addEventListener(event: 'connect' | 'disconnect', handleEvent: EventListener | EventListenerObject | null): void;
    /**
     * Remove an event listener.
     *
     * @param {string} event the event for which the listener should be removed.
     * @param {Function} handleEvent the handler to be removed.
     */
    removeEventListener(event: 'connect' | 'disconnect', handleEvent: EventListener | EventListenerObject | null): void;
}
export declare const serial: Serial;
export {};
