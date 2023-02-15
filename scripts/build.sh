#! /bin/zsh
FILENAME=$(basename "${1%.*}";)

clang++ --target=wasm32-unknown-unknown-wasm -emit-llvm -c -S -o out/tmp/$FILENAME.ll $1;

llc -march=wasm32 -filetype=obj -o out/tmp/$FILENAME.o out/tmp/$FILENAME.ll;

wasm-ld --no-entry --export-all -o out/$2/$FILENAME out/tmp/$FILENAME.o;

clang --target=wasm32 -emit-llvm -c -S matrix.cpp