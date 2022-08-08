import React, { useState } from "react";
import { render } from "react-dom";
import Example from "./examples";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from 'react-dnd-touch-backend'

const hasNative =
  document && (document.elementsFromPoint || document.msElementsFromPoint);

function getDropTargetElementsAtPoint(x, y, dropTargets) {
  return dropTargets.filter((t) => {
    const rect = t.getBoundingClientRect();
    return (
      x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
    );
  });
}

// use custom function only if elementsFromPoint is not supported
const backendOptions = {
  getDropTargetElementsAtPoint: !hasNative && getDropTargetElementsAtPoint,
  enableMouseEvents : true
};

export default function EventComponent() {
  const [state, setState] = useState({ swiped: false });
  const [_swipe, set_swipe] = useState({});
  //_swipe = {};
  const minDistance = 50;

  const _onTouchStart = (e) => {
    console.log("object");
    const touch = e.touches[0];
    let swipe = { ..._swipe };
    set_swipe({ ...swipe, x: touch.clientX });
    setState({ swiped: false });
  };

  const _onTouchMove = (e) => {
    console.log("object");

    if (e.changedTouches && e.changedTouches.length) {
      const touch = e.changedTouches[0];
      let swipe = { ..._swipe };
      set_swipe({ ...swipe, swiping: true });
    }
  };

  const _onTouchEnd = (e) => {
    console.log("object", e);

    const touch = e.changedTouches[0];
    const absX = Math.abs(touch.clientX - _swipe.x);
    console.log(_swipe, absX, minDistance);
    if (_swipe.swiping && absX > minDistance) {
      //props.onSwiped && props.onSwiped();
      console.log("hi");
      setState({ swiped: true });
    }
    set_swipe({});
  };

  return (
    <DndProvider
    backend={TouchBackend} 
    //backend={HTML5Backend}
      options={backendOptions}>
      <Example />
    </DndProvider>

    //   <div
    //   className='w-96 h-96 flex'
    //     onTouchStart={_onTouchStart}
    //     onTouchMove={_onTouchMove}
    //     onTouchEnd={_onTouchEnd}>
    //         <div className='w-48 h-96 flex'>
    //             Part 1
    //             <ul className='mt-10'>
    //                 <li className='border-black	'>
    //                     1
    //                 </li>
    //                 <li className='border-black	'>
    //                     2
    //                 </li>
    //                 <li className='border-black	'>
    //                     3
    //                 </li>
    //             </ul>
    //         </div>
    //         <div className='w-48 h-96 flex'>
    //             Part 2
    //             <ul className='mt-10'>
    //                 <li className='border-dash	p-5'>

    //                 </li>
    //                 <li className='border-dash	p-5'>

    //                 </li>
    //                 <li className='border-dash	p-5'>

    //                 </li>
    //             </ul>
    //         </div>
    //     {/* {`Component-${state.swiped ? 'swiped' : ''}`} */}
    //   </div>
  );
}
