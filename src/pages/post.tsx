import { useSuspenseQuery } from "@apollo/client";
import * as uuid from "uuid";
import { graphql } from "../gql";
import { useParams } from "react-router-dom";
import { Button, TextArea, Typography } from "../components";
import { UseFormRegisterReturn, useFieldArray, useForm } from "react-hook-form";
import UploadCloud02 from "../icons/upload-cloud-02.svg?react";
import { DesignPhase, UpsertPostOptionInput } from "../gql/graphql";
import clsx from "clsx";

const bucketName = "quorum-vote";

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

  const { register, handleSubmit, formState, control, setValue } = useForm<{
    designPhase: DesignPhase;
    content: string;
    options: Omit<UpsertPostOptionInput, "position">[];
  }>({
    defaultValues: {
      options: [
        {
          id: uuid.v4(),
          bucketName,
        },
        {
          id: uuid.v4(),
          bucketName,
        },
        {
          id: uuid.v4(),
          bucketName,
        },
      ],
    },
  });
  const optionsFieldArray = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = (data: unknown) => console.log(data);
  console.log(formState.errors);

  if (!data.post) {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-2 md:mt-4 bg-white m-4 p-4 md:p-8 md:max-w-3xl ml-auto mr-auto shadow-lg rounded-lg flex flex-col gap-2"
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
          <Typography
            size="s"
            element="p"
            className={clsx(
              "text-error-500",
              !formState.errors.designPhase && "invisible"
            )}
            ariaHidden={!formState.errors.designPhase}
          >
            Design phase is required
          </Typography>
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
            showCharacterCount
            maxLength={350}
          />
        </div>
        <Typography
          size="xl"
          element="p"
          style="bold"
          className="text-gray-800 mb-2"
        >
          Designs
        </Typography>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
          {optionsFieldArray.fields.map((field, i) => (
            <DesignOption
              id={field.id}
              setValue={(filePath: string) =>
                setValue(`options.${i}.filePath`, filePath)
              }
            />
          ))}
        </div>
        <div className="flex flex-row">
          <Button size="m" disabled={!formState.errors} type="submit">
            Post
          </Button>
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
      className={`flex flex-col justify-center items-center cursor-pointer p-4 flex-1 border has-[:checked]:border-primary-500 has-[:checked]:bg-primary-50 rounded border-gray-300 hover:bg-primary-25`}
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

function DesignOption(props: {
  id: string;
  setValue: (filePath: string) => void;
}) {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="rounded-lg border border-primary-500 border-dashed flex flex-col space-y-4 items-center justify-center py-6 md:py-20"
      >
        <div
          className="h-10 w-10 rounded border border-gray-200 shadow-xs flex items-center justify-center text-gray-600"
          aria-hidden
        >
          <UploadCloud02 />
        </div>
        <div className="flex flex-col space-y-2 text-center">
          <Typography size="s" element="p" className="text-gray-700">
            <strong className="text-primary-500">Click to Upload</strong> or
            <br />
            drag and drop
          </Typography>
          <Typography size="xs" element="p" className="text-gray-500">
            PNG, JPG or GIF
            <br />
            (5MB max file size)
          </Typography>
        </div>
      </label>
      <input
        type="file"
        id={props.id}
        name={props.id}
        accept=".png,.jpeg,.gif"
        className="hidden"
      />
    </div>
  );
}
