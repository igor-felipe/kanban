// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from "supertest";
import { faker } from "@faker-js/faker";
import { app } from "../app";
import * as user from "../validators/user_validator";
import * as workspace from "../validators/workspace_validator";
import * as member from "../validators/member_validator";
import * as board from "../validators/board_validator";
import * as column from "../validators/column_validator";
import * as card from "../validators/card_validator";

export const request = supertest(app);

export const createUserRequest = (input: user.CreateInput) =>
  request
    .post("/api/user/register")
    .send(input)
    .catch((e) => {
      throw new Error(`create user request error: ${e.response}`);
    });

export const loginRequest = (input: user.LoginInput) =>
  request
    .post("/api/user/login")
    .send(input)
    .catch((e) => {
      throw new Error(`login user request error: ${e.response}`);
    });

export const createWorkspaceRequest = (
  input: workspace.CreateDbInput,
  token: string,
) =>
  request
    .post("/api/workspace")
    .send(input)
    .set("Authorization", `Bearer ${token}`)
    .catch((e) => {
      throw new Error(`create workspace request error: ${e.response}`);
    });

export const createBoardRequest = (input: board.CreateInput, token: string) =>
  request
    .post("/api/board")
    .send(input)
    .set("Authorization", `Bearer ${token}`)
    .catch((e) => {
      throw new Error(`create board request error: ${e.response}`);
    });

export const createColumnRequest = (input: column.CreateInput, token: string) =>
  request
    .post("/api/column")
    .send(input)
    .set("Authorization", `Bearer ${token}`)
    .catch((e) => {
      throw new Error(`create column request error: ${e.response}`);
    });

export const createMemberRequest = (input: member.CreateInput, token: string) =>
  request
    .post("/api/member")
    .send(input)
    .set("Authorization", `Bearer ${token}`)
    .catch((e) => {
      throw new Error(`create member request error: ${e.response}`);
    });

export const createCardRequest = (input: any, token: string) =>
  request
    .post("/api/card")
    .send(input)
    .set("Authorization", `Bearer ${token}`)
    .catch((e) => {
      throw new Error(`create card request error: ${e.response}`);
    });

export const fakeUser = () => ({
  password: faker.string.nanoid(8),
  email: faker.internet.email().toLocaleLowerCase(),
  name: faker.person.fullName().toLocaleLowerCase(),
});

export const fakeWorkspace = (userId: string): workspace.CreateInput => ({
  name: faker.string.nanoid(8),
  userId,
});

export const fakeBoard = (workspaceId: string): board.CreateInput => ({
  name: faker.string.nanoid(8),
  description: "",
  workspaceId,
  labels: [0, 1, 2].map(() => ({
    color: faker.color.rgb(),
    name: faker.word.verb(),
  })),
});

export const fakeColumn = (
  input: Partial<column.CreateInput>,
): column.CreateInput => ({
  name: faker.string.nanoid(8),
  description: input.description ?? "",
  boardId: input.boardId ?? "",
  wip: input.wip ?? 1,
});

export const fakeCard = (
  input: Partial<card.CreateInput>,
): card.CreateInput => ({
  ...input,
  cover: input.cover ?? null,
  dueDate: input.dueDate ?? null,
  priority: input.priority ?? null,
  userId: input.userId ?? "",
  labels: input.labels ?? [],
  members: input.members ?? [],
  columnId: input.columnId ?? "",
  description: input.description ?? "",
  title: input.title ?? faker.word.words(),
  comments: input.comments ?? [
    { content: faker.word.words() },
    { content: faker.word.words() },
  ],
  activity: {
    action: "",
  },
});
