class node {
    int data;
    node next;
    node(int data) {
        this.data = data;
        this.next = null;
    }
}
class Creation_LinkedList{
    node head;   
    void insert_data(int data){
        node new_node =new node(data);
        if(head==null){
            head=new_node;
            return;
        }
        node temp=head;
        while ( temp.next!=null){
            temp=temp.next;
        }
        temp.next=new_node;
    }
    void display_data(){
        node temp=head;
        while (temp!=null){
            System.out.print(temp.data+" ");
            temp=temp.next;
        }
    }

}
class Demo_linkedlist_2{
    public static void main(String[] args) {
        Creation_LinkedList list=new Creation_LinkedList();
        list.insert_data(10);
        list.insert_data(20);
        list.insert_data(30);
        list.insert_data(40);
        list.display_data();
    }
}
