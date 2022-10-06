#include <stdio.h>
<<<<<<< HEAD
#include <emscripten/emscripten.h>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif
=======
>>>>>>> eda36c5 (Update)

int main() {

    printf("Hello World");

    return 0;
<<<<<<< HEAD
}


EXTERN EMSCRIPTEN_KEEPALIVE char* log(char* str) {
    printf("%s", str);
    return str;
}


[Log] fd_write – 1 – 5245984 – 2 – 5245980 ([wasm code], line 0, x800)

=======
}
>>>>>>> eda36c5 (Update)
