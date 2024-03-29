import { Controller, useForm } from "react-hook-form";
import { Card, Select, TextInput, Typography } from "../components";
import { useApolloClient, useSuspenseQuery } from "@apollo/client";
import { graphql } from "../gql";
import { redirect } from "react-router-dom";
import routes from "../routes";

const selectOptions: Array<{ value: string; label: string }> = [
  {
    value: "productDesigner",
    label: "Product Designer",
  },
  {
    value: "graphicDesigner",
    label: "Graphic Designer",
  },
  {
    value: "brandDesigner",
    label: "Brand Designer",
  },
  {
    value: "webDesigner",
    label: "Web Designer",
  },
  {
    value: "artDirector",
    label: "Art Director",
  },
  {
    value: "illustrator",
    label: "Illustrator",
  },
  {
    value: "motionDesigner",
    label: "Motion Designer",
  },
  {
    value: "contentDesigner",
    label: "Content Designer",
  },
  {
    value: "copywriter",
    label: "Copywriter",
  },
  {
    value: "engineer",
    label: "Engineer",
  },
  {
    value: "productManager",
    label: "Product Manager",
  },
  {
    value: "other",
    label: "Other",
  },
];

export function Welcome() {
  const apolloClient = useApolloClient();
  const { register, handleSubmit, formState, control } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    profession: string;
  }>({
    mode: "onBlur",
  });

  const { data } = useSuspenseQuery(
    graphql(`
      query WelcomePage {
        customer {
          id
        }
      }
    `)
  );

  if (data.customer) {
    redirect("/profile");
    return null;
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card>
        <div className="m-4 flex flex-col">
          <Typography
            element="h"
            size="s"
            style="bold"
            className="text-gray-900 mb-3"
          >
            Welcome!
          </Typography>
          <Typography element="p" size="m" className="text-gray-500 mb-4">
            Let&apos;s build your profile so we can provide the best start for
            you.
          </Typography>
          <form
            onSubmit={handleSubmit((values) => {
              console.log(values);
              apolloClient
                .mutate({
                  mutation: graphql(
                    `
                      mutation SignUp($input: SignUpInput!) {
                        signUp(input: $input) {
                          errors {
                            ... on BaseError {
                              message
                            }
                          }
                        }
                      }
                    `
                  ),
                  variables: {
                    input: {
                      ...values,
                      returnTo: routes.profile,
                    },
                  },
                })
                .then(({ data }) => {
                  let message = "Check log in link";
                  if (data?.signUp.errors.length) {
                    message =
                      "Error: " +
                      data.signUp.errors.map((e) => e.message).join(", ");
                  }
                  alert(message);
                });
            })}
            className="flex flex-col w-full"
          >
            <div className="flex flex-row space-between w-full gap-3">
              <TextInput
                label="First name"
                {...register("firstName", {
                  required: "First name is required",
                })}
                error={formState.errors["firstName"]}
              />
              <TextInput
                {...register("lastName", { required: "Last name is required" })}
                label="Last name"
                error={formState.errors["lastName"]}
              />
            </div>
            <TextInput
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Please enter a valid email",
                },
              })}
              type="email"
              label="Email address"
              error={formState.errors["email"]}
            />
            <Controller
              control={control}
              name="profession"
              render={(renderProps) => (
                <Select
                  options={selectOptions}
                  value={selectOptions.find(
                    (c) => c.value === renderProps.field.value
                  )}
                  onChange={(val) => renderProps.field.onChange(val?.value)}
                />
              )}
              rules={{ required: true }}
            />
            <button className="ml-auto" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
