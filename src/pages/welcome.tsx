import { Controller, useForm } from "react-hook-form";
import { Button, Card, Select, TextInput, Typography } from "../components";
import { useApolloClient, useMutation, useSuspenseQuery } from "@apollo/client";
import { graphql } from "../gql";
import { redirect } from "react-router-dom";
import routes from "../routes";
import { useState } from "react";

const selectOptions: Array<{ value: string; label: string }> = [
  {
    label: "Product Designer",
    value: "Product Designer",
  },
  {
    label: "Graphic Designer",
    value: "Graphic Designer",
  },
  {
    label: "Brand Designer",
    value: "Brand Designer",
  },
  {
    label: "Web Designer",
    value: "Web Designer",
  },
  {
    label: "Art Director",
    value: "Art Director",
  },
  {
    label: "Illustrator",
    value: "Illustrator",
  },
  {
    label: "Motion Designer",
    value: "Motion Designer",
  },
  {
    label: "Content Designer",
    value: "Content Designer",
  },
  {
    label: "Copywriter",
    value: "Copywriter",
  },
  {
    label: "Engineer",
    value: "Engineer",
  },
  {
    label: "Product Manager",
    value: "Product Manager",
  },
  {
    label: "Other",
    value: "Other",
  },
];

export function Welcome() {
  const [submittedAt, setSubmittedAt] = useState<Date | null>(null);
  const { register, handleSubmit, formState, control, getValues } = useForm<{
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

  const [signUpMutation, { loading }] = useMutation(
    graphql(
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
    )
  );

  if (data.customer) {
    redirect("/profile");
    return null;
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card>
        {submittedAt ? (
          <div className="flex flex-col gap-4 text-gray-800 text-center max-w-96">
            <Typography
              element="h"
              size="s"
              style="bold"
              className="text-gray-900 mb-3"
            >
              Check your email
            </Typography>
            <Typography element="p" size="m">
              If you have an account with us, we've sent an email to{" "}
              <strong>{getValues().email}</strong> with a magic link that you
              can use to sign in.
            </Typography>
            <Typography element="p" size="m">
              If you don&apos;t have an account, the link we sent will help you
              create an account.
            </Typography>
          </div>
        ) : (
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
                signUpMutation({
                  variables: { input: { ...values, returnTo: "/profile" } },
                }).then(({ data }) => {
                  if (data?.signUp.errors.length) {
                    const message =
                      "Error: " +
                      data.signUp.errors.map((e) => e.message).join(", ");
                    alert(message);
                  } else {
                    setSubmittedAt(new Date());
                  }
                });
              })}
              className="flex flex-col w-full gap-2"
            >
              <Typography size="l" element="p" style="bold">
                What&apos;s your name?
              </Typography>
              <div className="flex flex-col md:flex-row space-between w-full gap-3">
                <TextInput
                  label="First name"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={formState.errors["firstName"]}
                />
                <TextInput
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
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
              <Typography size="l" element="p" style="bold">
                What best describes your profession?
              </Typography>
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
              <Button
                className="ml-auto mt-4"
                size="l"
                type="submit"
                isLoading={loading}
                disabled={!formState.isValid}
              >
                Continue
              </Button>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
}
