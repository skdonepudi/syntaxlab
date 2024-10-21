//default code for the editor for all the languages in language.ts with different algorithms
// Define the type for our default code object
type DefaultCodeMap = {
  [key: string]: string;
};

// Create a single object to store all default codes
const defaultCodeMap: DefaultCodeMap = {
  javascript: `// Simple JavaScript Example: Bubble Sort Algorithm

function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j + 1]
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}

// Example usage
const numbers = [64, 34, 25, 12, 22, 11, 90];
console.log("Unsorted array:", numbers);
const sortedNumbers = bubbleSort(numbers);
console.log("Sorted array:", sortedNumbers);
`,

  python: `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
print(quick_sort(numbers))`,

  c: `#include <stdio.h>

void merge(int arr[], int l, int m, int r) {
    // ... (merge sort implementation)
}

void mergeSort(int arr[], int l, int r) {
    if (l < r) {
        int m = l + (r - l) / 2;
        mergeSort(arr, l, m);
        mergeSort(arr, m + 1, r);
        merge(arr, l, m, r);
    }
}

int main() {
    int arr[] = {12, 11, 13, 5, 6, 7};
    int arr_size = sizeof(arr) / sizeof(arr[0]);
    
    printf("Given array is \\n");
    for (int i = 0; i < arr_size; i++)
        printf("%d ", arr[i]);
    
    mergeSort(arr, 0, arr_size - 1);
    
    printf("\\nSorted array is \\n");
    for (int i = 0; i < arr_size; i++)
        printf("%d ", arr[i]);
    return 0;
}`,

  cpp: `#include <iostream>
#include <vector>
using namespace std;

int knapsack(int W, vector<int>& wt, vector<int>& val, int n) {
    vector<vector<int>> K(n + 1, vector<int>(W + 1));
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                K[i][w] = 0;
            else if (wt[i - 1] <= w)
                K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
            else
                K[i][w] = K[i - 1][w];
        }
    }
    return K[n][W];
}

int main() {
    vector<int> val = {60, 100, 120};
    vector<int> wt = {10, 20, 30};
    int W = 50;
    int n = val.size();
    cout << "Maximum value: " << knapsack(W, wt, val, n);
    return 0;
}`,

  java: `// Simple Java Example: Selection Sort Algorithm

public class Main {
    public static void selectionSort(int[] arr) {
        int n = arr.length;
        for (int i = 0; i < n - 1; i++) {
            int minIndex = i;
            for (int j = i + 1; j < n; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            // Swap the found minimum element with the first element
            int temp = arr[minIndex];
            arr[minIndex] = arr[i];
            arr[i] = temp;
        }
    }

    public static void main(String[] args) {
        int[] numbers = {64, 25, 12, 22, 11};
        System.out.println("Unsorted array:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();

        selectionSort(numbers);

        System.out.println("Sorted array:");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
    }
}
`,

  typescript: `function binarySearch<T>(arr: T[], target: T): number {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Target not found
}

const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
console.log(binarySearch(numbers, 7)); // Output: 3
console.log(binarySearch(numbers, 10)); // Output: -1`,

  go: `package main

import (
    "fmt"
    "math"
)

func sieveOfEratosthenes(n int) []int {
    isPrime := make([]bool, n+1)
    for i := 2; i <= n; i++ {
        isPrime[i] = true
    }

    for p := 2; p*p <= n; p++ {
        if isPrime[p] {
            for i := p * p; i <= n; i += p {
                isPrime[i] = false
            }
        }
    }

    var primes []int
    for i := 2; i <= n; i++ {
        if isPrime[i] {
            primes = append(primes, i)
        }
    }

    return primes
}

func main() {
    n := 50
    primes := sieveOfEratosthenes(n)
    fmt.Printf("Prime numbers up to %d: %v\\n", n, primes)
}`,

  rust: `fn bubble_sort<T: Ord>(arr: &mut [T]) {
    let n = arr.len();
    for i in 0..n {
        for j in 0..n - i - 1 {
            if arr[j] > arr[j + 1] {
                arr.swap(j, j + 1);
            }
        }
    }
}

fn main() {
    let mut numbers = vec![64, 34, 25, 12, 22, 11, 90];
    println!("Original array: {:?}", numbers);
    
    bubble_sort(&mut numbers);
    println!("Sorted array: {:?}", numbers);
}`,

  php: `<?php
// Fibonacci sequence generator
function fibonacci($n) {
    $fib = array(0, 1);
    for ($i = 2; $i < $n; $i++) {
        $fib[$i] = $fib[$i-1] + $fib[$i-2];
    }
    return $fib;
}

$n = 10;
$fibSequence = fibonacci($n);
echo "First $n numbers of Fibonacci sequence: ";
echo implode(", ", $fibSequence);
?>`,

  r: `# K-means clustering

# Generate sample data
set.seed(42)
x <- rbind(matrix(rnorm(100, sd = 0.3), ncol = 2),
           matrix(rnorm(100, mean = 1, sd = 0.3), ncol = 2))
colnames(x) <- c("x", "y")

# Perform K-means clustering
kmeans_result <- kmeans(x, centers = 2)

# Plot the results
plot(x, col = kmeans_result$cluster)
points(kmeans_result$centers, col = 1:2, pch = 8, cex = 2)

# Print cluster centers
print(kmeans_result$centers)`,

  sql: `-- Create a sample table
CREATE TABLE employees (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    department VARCHAR(50),
    salary DECIMAL(10, 2)
);

-- Insert some sample data
INSERT INTO employees (id, name, department, salary)
VALUES 
    (1, 'John Doe', 'IT', 75000),
    (2, 'Jane Smith', 'HR', 65000),
    (3, 'Bob Johnson', 'IT', 80000),
    (4, 'Alice Brown', 'Marketing', 70000),
    (5, 'Charlie Davis', 'HR', 68000);

-- Query to get average salary by department
SELECT department, AVG(salary) as avg_salary
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- Query to find the highest paid employee in each department
SELECT e1.department, e1.name, e1.salary
FROM employees e1
WHERE e1.salary = (
    SELECT MAX(e2.salary)
    FROM employees e2
    WHERE e2.department = e1.department
);`,

  nasm: `; Hello World in NASM Assembly

section .data
    hello db 'Hello, World!', 0  ; null-terminated string

section .text
    global _start

_start:
    ; Write the string to stdout
    mov rax, 1          ; syscall: write
    mov rdi, 1          ; file descriptor: stdout
    mov rsi, hello      ; pointer to the string
    mov rdx, 13         ; length of the string
    syscall             ; call kernel

    ; Exit the program
    mov rax, 60         ; syscall: exit
    xor rdi, rdi        ; exit code 0
    syscall             ; call kernel
`,

  shell: `#!/bin/bash

# Simple Backup Script

SOURCE_DIR="$1"  # First argument: source directory
BACKUP_DIR="$2"  # Second argument: backup directory

# Check if source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
    echo "Source directory does not exist."
    exit 1
fi

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Copy files from source to backup directory
cp -r "$SOURCE_DIR/"* "$BACKUP_DIR/"

echo "Backup of '$SOURCE_DIR' completed in '$BACKUP_DIR'."
`,

  // Add more languages as needed...
};

export function getDefaultCode(language: string): string {
  return defaultCodeMap[language] || "// Your code goes here";
}
