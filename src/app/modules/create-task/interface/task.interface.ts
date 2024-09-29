export interface ITask {
    taskName:        string;
    limitDate:       Date;
    associatedUsers: AssociatedUser[];
}

export interface AssociatedUser {
    username: string;
    age:      string;
    skills:   string[];
}
