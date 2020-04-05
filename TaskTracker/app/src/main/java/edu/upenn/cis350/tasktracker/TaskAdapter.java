package edu.upenn.cis350.tasktracker;

import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;

import java.util.ArrayList;

public class TaskAdapter extends RecyclerView.Adapter<TaskAdapter.MyViewHolder> {

    Context context;
    ArrayList<Task> task;

    public TaskAdapter(Context c,  ArrayList<Task> t){
        context = c;
        task = t;
    }

    @NonNull
    @Override
    public MyViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        return new MyViewHolder(LayoutInflater.from(context).inflate(R.layout.item_task, parent, false));
    }

    @Override
    public void onBindViewHolder(@NonNull MyViewHolder holder, int position) {
        holder.title.setText(task.get(position).getTitle());
        holder.desc.setText(task.get(position).getDesc());
        holder.deadline.setText(task.get(position).getDeadline());
    }

    @Override
    public int getItemCount() {
        return task.size();
    }

    class MyViewHolder extends RecyclerView.ViewHolder {

        TextView title, desc, deadline;

        public MyViewHolder(@NonNull View itemView){
            super(itemView);
            title = (TextView) itemView.findViewById(R.id.title);
            desc = (TextView) itemView.findViewById(R.id.desc);
            deadline = (TextView) itemView.findViewById(R.id.deadline);
        }
    }

}
