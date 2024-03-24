import { useFormik } from "formik";
import { Card, Typography } from "../components";
import { useApolloClient, useSuspenseQuery } from "@apollo/client";
import { graphql } from "../gql";
import { redirect } from "react-router-dom";
import routes from "../routes";

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
            className="text-gray-900"
          >
            Welcome!
          </Typography>
          <Typography element="p" size="m" className="text-gray-500">
            Let&apos;s build your profile so we can provide the best start for
            you.
          </Typography>
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
                  id="productDesigner"
                  name="profession"
                  value="Product Designer"
                  required
                />
                <label htmlFor="productDesigner">Product Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="graphicDesigner"
                  name="profession"
                  value="Graphic Designer"
                />
                <label htmlFor="graphicDesigner">Graphic Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="brandDesigner"
                  name="profession"
                  value="Brand Designer"
                />
                <label htmlFor="brandDesigner">Brand Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="webDesigner"
                  name="profession"
                  value="Web Designer"
                />
                <label htmlFor="webDesigner">Web Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="artDirector"
                  name="profession"
                  value="Art Director"
                />
                <label htmlFor="artDirector">Art Director</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="illustrator"
                  name="profession"
                  value="Illustrator"
                />
                <label htmlFor="illustrator">Illustrator</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="motionDesigner"
                  name="profession"
                  value="Motion Designer"
                />
                <label htmlFor="motionDesigner">Motion Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="contentDesigner"
                  name="profession"
                  value="Content Designer"
                />
                <label htmlFor="contentDesigner">Content Designer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="copywriter"
                  name="profession"
                  value="Copywriter"
                />
                <label htmlFor="copywriter">Copywriter</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="engineer"
                  name="profession"
                  value="Engineer"
                />
                <label htmlFor="engineer">Engineer</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="productManager"
                  name="profession"
                  value="Product Manager"
                />
                <label htmlFor="productManager">Product Manager</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="other"
                  name="profession"
                  value="Other"
                />
                <label htmlFor="other">Other</label>
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
