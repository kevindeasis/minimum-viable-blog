// compile with:
// g++ minimumViableVirtualMachine.cpp -o minimumViableVirtualMachine.out
// run with:
// ./minimumViableVirtualMachine.out

#include <iostream>
#include <vector>
#include <stdbool.h>

std::vector<int> stack(1);

bool hasInstruction = true;
int instructionPointer = 0;
int stackPointer = -1;

typedef enum {
   PUSH_TO_STACK,
   ADD,
   POP_STACK_AND_PRINT,
   HALT_AND_NOT_CATCH_FIRE
} InstructionOpCode;

const int programByteCode[] = {
    PUSH_TO_STACK,
    1,
    PUSH_TO_STACK,
    2,
    ADD,
    PUSH_TO_STACK,
    4,
    ADD,
    PUSH_TO_STACK,
    8,
    ADD,
    POP_STACK_AND_PRINT,
    HALT_AND_NOT_CATCH_FIRE
};

void applyInstruction(int anInstruction) {
    switch (anInstruction) {
        case PUSH_TO_STACK: {
    	    stackPointer++;
	        stack[stackPointer] = programByteCode[++instructionPointer];
	        break;
        }
        case ADD: {
	        int firstArgument = stack[stackPointer--];	    
	        int secondArgument = stack[stackPointer--];
	        int result = secondArgument + firstArgument;
	        stackPointer++;
	        stack[stackPointer] = result;
	        break;
	    }
        case POP_STACK_AND_PRINT: {
	        int val_popped = stack[stackPointer--];
            std::cout << "last item on the stack: " << val_popped << std::endl;
	        break;
	    }
        case HALT_AND_NOT_CATCH_FIRE: {
            hasInstruction = false;
            std::cout << "halt program" << std::endl;
            break;
        }
    }
}

int getNextInstruction() {
    return programByteCode[instructionPointer];
}

int main() {
    while (hasInstruction) {
        applyInstruction(getNextInstruction());
        instructionPointer++;
    }
}
