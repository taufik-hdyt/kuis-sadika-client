import { Text, useToast } from "native-base";
import { useEffect } from "react";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { useDispatch } from "react-redux";
import { setScore } from "../redux/reducers/ScoreReducer";
import { setGoNextQuestion } from "../redux/reducers/TimerReducer";
import ToastStanding from "./PlayGameStandings";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Routes } from "../navigation/routes";
import {
  MainStackParamList,
  PlayGameNavigation,
} from "../navigation/MainNavigation";

interface Props {
  isPlaying: boolean;
  durasi: number;
  size?: number;
  textSize?: string;
  strokeWidth?: number;
  isCheckAnswer: any;
  setQuestionIndex: (e: number) => void;
  questionIndex?: number;
  shouldNavigate?: boolean;
}
export const TimerQuestion = ({
  durasi,
  isPlaying,
  size,
  textSize,
  strokeWidth,
  isCheckAnswer,
  questionIndex,
  setQuestionIndex,
  shouldNavigate,
}: Props) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigation<NavigationProp<MainStackParamList>>();
  return (
    <CountdownCircleTimer
      isPlaying={isPlaying}
      duration={durasi}
      size={size ? size : 50}
      colors={["#3EC70B", "#F94C10", "#FE0000"]}
      colorsTime={[durasi, durasi * 0.5, 0]}
      strokeWidth={strokeWidth ? strokeWidth : 8}
      onComplete={() => {
        if (!shouldNavigate) {
          setQuestionIndex(questionIndex + 1);
          toast.show({
            placement: "bottom",
            render: ({ id }) => {
              return (
                <ToastStanding
                  id={id}
                  title={"Current standings"}
                  variant={"top-accent"}
                  status="success"
                />
              );
            },
          });
        }
        if (shouldNavigate) {
          navigate.navigate(Routes.Score);
        }

        return { shouldRepeat: shouldNavigate ? false : true, delay: 0.5 };
      }}
    >
      {({ remainingTime }) => {
        useEffect(() => {
          if (isCheckAnswer) {
            let score = 3 * 2;
            if (remainingTime > durasi * 0.8) {
              score += 69;
            } else if (remainingTime > durasi * 0.5) {
              score += 39;
            } else if (remainingTime > durasi * 0.2) {
              score += 9;
            }
            dispatch(setScore(score));
          }
        }, [isCheckAnswer, remainingTime]);
        return (
          <Text p={2} fontWeight="bold" fontSize={textSize ? textSize : "lg"}>
            {remainingTime}s
          </Text>
        );
      }}
    </CountdownCircleTimer>
  );
};