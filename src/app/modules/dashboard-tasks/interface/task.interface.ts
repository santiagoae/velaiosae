export interface ITask {
    taskName:        string;
    limitDate:       Date;
    associatedUsers: AssociatedUser[];
    done:            boolean;   
}

export interface AssociatedUser {
    username: string;
    age:      string;
    skills:   string[];
}
