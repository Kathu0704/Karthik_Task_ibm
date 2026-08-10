class Node {
    int val;
    Node left, right;

    Node(int val) {
        this.val = val;
    }
}
public class Tree_Creation {
    public static void main(String[] args) {
        // Create root node
        Node root = new Node(10);
        // Insert values
        root.left = new Node(20);
        root.right = new Node(30);
        root.left.left = new Node(40);
        root.left.right = new Node(50);
        root.right.left = new Node(60);
        root.right.right = new Node(70);

        // Display tree values
        System.out.println("Inorder Traversal:");
        inorder(root);
    }
    // Inorder: Left -> Root -> Right
    static void inorder(Node root) {
        if (root == null)
            return;
        inorder(root.left);
        System.out.print(root.val + " ");
        inorder(root.right);
    }
}
