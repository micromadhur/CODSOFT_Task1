import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

public class AddTaskActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_task);

        EditText taskTitle = findViewById(R.id.task_title);
        EditText taskDesc = findViewById(R.id.task_desc);
        EditText taskDueDate = findViewById(R.id.task_due_date);
        Spinner taskPriority = findViewById(R.id.task_priority);
        Button saveTaskButton = findViewById(R.id.save_task_button);

        saveTaskButton.setOnClickListener(v -> {
            String title = taskTitle.getText().toString();
            String desc = taskDesc.getText().toString();
            String dueDate = taskDueDate.getText().toString();
            String priority = taskPriority.getSelectedItem().toString();

            Task task = new Task(title, desc, dueDate, priority);
            Intent resultIntent = new Intent();
            resultIntent.putExtra("task", task);
            setResult(RESULT_OK, resultIntent);
            finish();
        });
    }
}
