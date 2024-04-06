import { useSuspenseQuery } from "@apollo/client";
import * as uuid from "uuid";
import { graphql } from "../gql";
import { useParams } from "react-router-dom";
import { TextArea, Typography } from "../components";
import { UseFormRegisterReturn, useForm } from "react-hook-form";
import { DesignPhase } from "../gql/graphql";

export function Post() {
  const { postId } = useParams();
  if (!postId || !uuid.validate(postId)) {
    throw new Error("expected postId to be a uuid");
  }
  const { data } = useSuspenseQuery(
    graphql(`
      query PostPage($postId: UUID!) {
        post(id: $postId) {
          id
        }
      }
    `),
    {
      variables: {
        postId,
      },
    }
  );

  const { register, handleSubmit, formState } = useForm<{
    designPhase: DesignPhase;
    content: string;
  }>();
  const onSubmit = (data: unknown) => console.log(data);
  console.log(formState.errors);

  if (!data.post) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 md:mt-4 bg-white m-4 p-4 md:p-8 md:max-w-3xl ml-auto mr-auto shadow-lg rounded-lg flex flex-col gap-4"
      >
        <Typography
          size="s"
          element="h"
          style="bold"
          className="text-gray-800 mb-2"
        >
          New post
        </Typography>
        <div className="flex flex-col space-2">
          <Typography
            size="xl"
            element="p"
            style="bold"
            className="text-gray-800 mb-2"
          >
            Design phase
          </Typography>
          <div className="flex flex-col md:flex-row w-full gap-1">
            <DesignPhaseOption
              adornmentClassName="bg-gray-200 border border-dashed border-gray-400"
              heading="Wireframe"
              description="No colours, more conceptual only"
              value="WIREFRAME"
              register={register("designPhase", { required: true })}
            />
            <DesignPhaseOption
              adornmentClassName="bg-primary-100"
              heading="Lo-fi"
              description="Looks closer to UI with style starting to show"
              value="LO_FI"
              register={register("designPhase", { required: true })}
            />
            <DesignPhaseOption
              adornmentClassName="hifi-block"
              heading="Hi-fi"
              description="Polished designs almost ready for handover"
              value="HI_FI"
              register={register("designPhase", { required: true })}
            />
          </div>
        </div>
        <div className="flex flex-col space-2">
          <Typography
            size="xl"
            element="p"
            style="bold"
            className="text-gray-800 mb-2"
          >
            Context
          </Typography>
          <TextArea
            {...register("content", {
              required: "Content is required",
            })}
            error={formState.errors["content"]}
            placeholder="Text goes here"
            rows={5}
            characterCount
            maxLength={350}
          />
        </div>
      </form>
    );
  }

  return (
    <p className="font-normal">
      {postId}: {data.post?.id}
    </p>
  );
}

function DesignPhaseOption(props: {
  adornmentClassName: string;
  heading: string;
  description: string;
  register: UseFormRegisterReturn<"designPhase">;
  value: DesignPhase;
}) {
  return (
    <label
      htmlFor={props.value}
      className={`flex flex-col justify-center items-center cursor-pointer p-4 flex-1 border md:border-white has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 rounded border-gray-300 hover:bg-primary-25`}
    >
      <div
        className={`${props.adornmentClassName} w-10 h-10 cursor-pointer`}
        aria-hidden
      ></div>
      <Typography
        size="l"
        element="p"
        style="bold"
        className="text-gray-800 mt-2 cursor-pointer"
      >
        {props.heading}
      </Typography>
      <Typography
        size="s"
        element="p"
        className="text-gray-500 mt-2 cursor-pointer text-center"
      >
        {props.description}
      </Typography>
      <input
        id={props.value}
        type="radio"
        className="hidden"
        {...props.register}
      />
    </label>
  );
}
