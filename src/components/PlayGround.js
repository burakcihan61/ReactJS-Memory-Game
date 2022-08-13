import { React } from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFramework, updateFramework } from "../redux/frameWorkSlice";
import { frameworkSelectors } from "../redux/frameWorkSlice";
import Card from "./Card";
import { duplicatedFrameworks, shuffle } from "./duplicatedFrameworks";

function PlayGround() {
  const [openedFrameworks, setOpenedFrameworks] = useState([]);
  const dispatch = useDispatch();
  const frameworks = useSelector(frameworkSelectors.selectAll);

  useEffect(() => {
    shuffle(duplicatedFrameworks).map((name, index) =>
      dispatch(
        addFramework({
          id: index,
          name,
          close: true,
          complete: false,
          fail: false,
        })
      )
    );
  }, [dispatch]);

  useEffect(() => {
    openedFrameworks.length > 0 &&
      openedFrameworks.forEach((openedFramework) =>
        dispatch(
          updateFramework({
            id: openedFramework.index,
            changes: {
              close: false,
            },
          })
        )
      );

    if (openedFrameworks.length > 1) {
      setTimeout(() => {
        setTimeout(() => {
          if (
            openedFrameworks[0].name === openedFrameworks[1].name &&
            openedFrameworks[0].index !== openedFrameworks[1].index
          ) {
            openedFrameworks.forEach((openedFramework) =>
              dispatch(
                updateFramework({
                  id: openedFramework.index,
                  changes: {
                    complete: true,
                  },
                })
              )
            );
          } else {
            openedFrameworks.forEach((openedFramework) =>
              dispatch(
                updateFramework({
                  id: openedFramework.index,
                  changes: {
                    close: true,
                  },
                })
              )
            );
          }
        }, 750);

        setOpenedFrameworks([]);
      }, 1000);
    }
  }, [openedFrameworks, dispatch]);

  const handleClick = (name, index) => {
    let framework = {
      name,
      index,
    };
    setOpenedFrameworks([...openedFrameworks, framework]);
  };

  return (
    <div className="playground">
      {frameworks.length > 0 &&
        frameworks.map((framework, id) => {
          return (
            <Card
              className={framework.complete}
              key={id}
              framework={framework.name}
              click={() => {
                !framework.complete &&
                  openedFrameworks.length < 2 &&
                  handleClick(framework.name, id);
              }}
              close={framework.close}
              complete={framework.complete}
            />
          );
        })}
    </div>
  );
}

export default PlayGround;
