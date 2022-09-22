#include <stdio.h>
#include <emscripten/emscripten.h>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

int main() {

    printf("Hello World");

    return 0;
}


EXTERN EMSCRIPTEN_KEEPALIVE char* log(char* str) {
    printf("%s", str);
    return str;
}


[Log] fd_write – 1 – 5245984 – 2 – 5245980 ([wasm code], line 0, x800)

