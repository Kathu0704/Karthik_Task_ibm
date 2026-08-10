public class SelectionSort {

    public static void main(String[] args) {

        int[] arr = { 64, 25, 12, 22, 11 };
        int n = arr.length;

        // Selection Sort
        for (int i = 0; i < n - 1; i++) {

            // Assume the current position has the minimum element
            int min = i;

            // Find the smallest element in the remaining array
            for (int j = i + 1; j < n; j++) {

                if (arr[j] < arr[min]) {
                    min = j;
                }
            }

            // Swap the minimum element with the current element
            int temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }

        // Display the sorted array
        System.out.println("Sorted Array:");

        for (int value : arr) {
            System.out.print(value + " ");
        }
    }
}