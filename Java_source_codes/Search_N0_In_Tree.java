class Node {
    int val;
    Node left, right;

    Node(int val) {
        this.val = val;
    }
}

public class Search_N0_In_Tree {

    public static void main(String[] args) {

        // Create the tree
        Node root = new Node(10);

        root.left = new Node(20);
        root.right = new Node(30);

        root.left.left = new Node(40);
        root.left.right = new Node(50);

        root.right.left = new Node(60);
        root.right.right = new Node(70);

        // Display tree values
        System.out.println("Inorder Traversal:");
        inorder(root);

        // Search for a number
        int searchValue = 50;

        if (search(root, searchValue)) {
            System.out.println("\n" + searchValue + " is found in the tree.");
        } else {
            System.out.println("\n" + searchValue + " is not found in the tree.");
        }
    }

    // Inorder Traversal: Left -> Root -> Right
    static void inorder(Node root) {

        if (root == null) {
            return;
        }

        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }

    // Search for a value in the Binary Tree
    static boolean search(Node root, int value) {

        // If tree is empty or value is not found
        if (root == null) {
            return false;
        }

        // If current node contains the value
        if (root.val == value) {
            return true;
        }

        // Search in the left subtree
        if (search(root.left, value)) {
            return true;
        }

        // Search in the right subtree
        return search(root.right, value);
    }
}