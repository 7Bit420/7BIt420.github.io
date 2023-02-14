#include <vector>
#include <time.h>
#include <sys/ioctl.h>
#include <unistd.h>
#include <deque>
#include <iostream>
using namespace std;

struct colData
{
    int charsLeft;
    bool state;
};
vector<colData> matrixData;
vector<deque<bool> >  matrix;

int cols = 0, rows = 0, bufferI = 0;
char buffer[5000];
const int randConst = 20;
const char *randChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&()[]";

char randomChar()
{
    return randChars[rand() % 72];
}

void init()
{
    struct winsize w;
    ioctl(STDOUT_FILENO, TIOCGWINSZ, &w);
    cols = w.ws_col;
    rows = w.ws_row;
    matrixData = vector<colData>(cols);
    matrix = vector<deque<bool> >(cols);
    memset(buffer,0,500);
    bufferI = 0;

    for (int c = 0; c < cols; c++)
    {
        matrix.push_back(deque<bool>(rows));
        for (int r = 0; r < rows; r++)
            matrix.at(c).push_back(true);
    }
    for (int c = 0; c < cols; c++)
    {
        colData data = colData();
        data.state = false;
        data.charsLeft = 1 + rand() % randConst;
        matrixData.push_back(data);
    }
}

void replaceChars()
{
    // printf("%d\n", matrixData.size());
    for (int colN = 0; colN < matrixData.size(); colN++)
    {
        // printf("%d\n", colN);
        // printf("Access Coldata\n");
        if (matrixData[colN].charsLeft <= 0)
        {
            matrixData[colN].charsLeft = ((matrixData[colN].state * 2) + 1) * (rand() % randConst) + 9;
            // printf("%d\n", matrixData[colN].charsLeft);
            matrixData[colN].state = !matrixData[colN].state;
        }
        matrixData[colN].charsLeft--;
        // printf("Pop Back\n");
        // printf("N: %lu\n", matrix.at(colN).at(0));
        matrix.at(colN).pop_back();
        // printf("Push Front\n");
        matrix.at(colN).push_front(matrixData[colN].state);
    }
}

void update()
{
    replaceChars();
    fflush(stdout);
    // printf("Loop 1\n");
    for (int x = 0; x < rows; x++)
    {
        // printf("Loop 2\n");
        for (int y = 0; y < cols; y++)
        {
            // printf("Change Colour Start %c\n", randomChar());
            if (x < rows && (matrix[y][x] != matrix[y][x + 1]))
                printf("%s", "\033[37m");
            // printf("Char: %i X: %d Y: %d\n", matrix[0][1], x, y);
            // printf("Print char\n");
            printf("%c", (!matrix[y][x] ? randomChar() : ' '));
            // printf("Change Colour End\n");
            if (x < rows && (matrix[y][x] != matrix[y][x + 1]))
                printf("%s", "\033[32m");
        }
        printf("%s", "\n");
    }
}

int main()
{
    printf("\033[40m\n");
    srand(time(NULL));
    init();
    while (1)
    {
        update();
        usleep(100000);
    };
    // TODO Init on resize
}