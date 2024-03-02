import { useFormik } from "formik";
import { Card } from "../components";
import { useApolloClient, useSuspenseQuery } from "@apollo/client";
import { graphql } from "../gql";
import { redirect } from "react-router-dom";

export function Welcome() {
  const apolloClient = useApolloClient();
  const formik = useFormik<{
    firstName: string;
    lastName: string;
    email: string;
    profession: string;
  }>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      profession: "",
    },
    onSubmit(values) {
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
              returnTo: "/welcome",
            },
          },
        })
        .then(({ data }) => {
          let message = "Check log in link";
          if (data?.signUp.errors.length) {
            message =
              "Error: " + data.signUp.errors.map((e) => e.message).join(", ");
          }
          alert(message);
        });
    },
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
    return redirect("/profile");
  }

  return (
    <div className="h-full w-full flex justify-center items-center">
      <Card>
        <div className="m-4 flex flex-col">
          <h1 className="font-bold text-lg">Welcome!</h1>
          <p>
            Let&apos;s build your profile so we can provide the best start for
            you.
          </p>
          <form onSubmit={formik.handleSubmit} className="flex flex-col w-full">
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.firstName}
              required
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.lastName}
              required
            />
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
            <fieldset>
              <legend>What best describes your profession?</legend>
              <div>
                <input
                  type="radio"
                  id="Product Designer"
                  name="professsion"
                  value="Product Designer"
                  required
                />
                <label htmlFor="Product Designer">Product Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Graphic Designer"
                  name="professsion"
                  value="Graphic Designer"
                />
                <label htmlFor="Graphic Designer">Graphic Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Brand Designer"
                  name="professsion"
                  value="Brand Designer"
                />
                <label htmlFor="Brand Designer">Brand Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Web Designer"
                  name="professsion"
                  value="Web Designer"
                />
                <label htmlFor="Web Designer">Web Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Art Director"
                  name="professsion"
                  value="Art Director"
                />
                <label htmlFor="Art Director">Art Director</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Illustrator"
                  name="professsion"
                  value="Illustrator"
                />
                <label htmlFor="Illustrator">Illustrator</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Motion Designer"
                  name="professsion"
                  value="Motion Designer"
                />
                <label htmlFor="Motion Designer">Motion Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Content Designer"
                  name="professsion"
                  value="Content Designer"
                />
                <label htmlFor="Content Designer">Content Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Copywriter"
                  name="professsion"
                  value="Copywriter"
                />
                <label htmlFor="Copywriter">Copywriter</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Engineer"
                  name="professsion"
                  value="Engineer"
                />
                <label htmlFor="Engineer">Engineer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Product Manager"
                  name="professsion"
                  value="Product Manager"
                />
                <label htmlFor="Product Manager">Product Manager</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="Other"
                  name="professsion"
                  value="Other"
                />
                <label htmlFor="Other">Other</label>
              </div>
            </fieldset>
            <button className="ml-auto" type="submit">
              Submit
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
