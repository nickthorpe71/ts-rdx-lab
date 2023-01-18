import {
    SearchRepositoriesAction,
    SearchRepositoriesSuccessAction,
    SearchRepositoriesErrorAction,
} from "./repositoryActions";

export type Action =
    | SearchRepositoriesAction
    | SearchRepositoriesSuccessAction
    | SearchRepositoriesErrorAction;
