export interface MessageInterface {
  getId(): Promise<string>;

  setText(text: string): Promise<void>;
  getText(): Promise<string>;

  setTitle(message: string): Promise<void>;
  getTitle(): Promise<string>;
}

export interface MessageAttachment {
  getId(): Promise<string>;

  setFile(path: string): Promise<void>;
  getFile(): Promise<string>;

  setName(name: string): Promise<void>;
  getName(): Promise<string>;
}

export interface MessageReceiverInterface {
  getId(): Promise<string>;

  setName(name: string): Promise<void>;
  getName(): Promise<string>;

  setTarget(target: string): Promise<void>;
  getTarget(): Promise<string>;
}

export interface MessageWrapperInterface {
  getId(): Promise<string>;

  setMessage(message: MessageInterface): Promise<void>;
  getMessage(): Promise<MessageInterface>;

  setAttachment(attachment: MessageAttachment): Promise<void>;
  getAttachment(): Promise<MessageAttachment>;

  setReceiver(receiver: MessageReceiverInterface): Promise<void>;
  getReceiver(): Promise<MessageReceiverInterface>;
}

export interface MessageSenderInterface {
  getId(): Promise<string>;

  sendMessage(messageWrapper: MessageWrapperInterface): Promise<void>;
}
