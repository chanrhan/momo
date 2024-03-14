package com.momo.enums;

public enum ChatResponseHeader {
	SEND(0),
	READ(1),
	EMO(2),
	DEL(3),
	QUIT(4);

	int value;

	ChatResponseHeader(int value){
		this.value=value;
	}
}
