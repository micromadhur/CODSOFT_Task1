public class Task {
    private String title;
    private String description;
    private String dueDate;
    private String priority;
    private boolean isCompleted;

    public Task(String title, String description, String dueDate, String priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isCompleted = false;
    }

    // Getters and setters
}
