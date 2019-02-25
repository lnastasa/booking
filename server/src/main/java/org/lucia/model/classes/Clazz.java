package org.lucia.model.classes;

import java.util.List;

public class Clazz {

    long id;

    String name;

    long teacherId;

    List<Long> childIds;

    public List<Long> getChildIds() {
        return childIds;
    }

    public void setChildIds(List<Long> childIds) {
        this.childIds = childIds;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(long teacherId) {
        this.teacherId = teacherId;
    }

    @Override
    public String toString() {
        return "Clazz{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", teacherId=" + teacherId +
                '}';
    }
}
