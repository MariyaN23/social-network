import React from 'react';
import TestRenderer from 'react-test-renderer';
import {ProfileStatus} from './ProfileStatus';

describe("ProfileStatus component", ()=> {
    test("Status from props should be in the state", ()=> {
        // @ts-ignore
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=>{}} profileId={''} authId={''}/>)
        const instance = component.getInstance()
        // @ts-ignore
        expect(instance?.state.status).toBe("it-kamasutra.com")
    })

    test("After creation span should be displayed", ()=> {
        // @ts-ignore
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=>{}} profileId={''} authId={''}/>)
        const root = component.root
        // eslint-disable-next-line testing-library/await-async-query
        const span = root.findByType("span")
        expect(span).not.toBeNull()
    })

    test("After creation input should not be displayed", ()=> {
        // @ts-ignore
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=>{}} profileId={''} authId={''}/>)
        const root = component.root
        expect( ()=> {
            // eslint-disable-next-line testing-library/await-async-query
            root.findByType("input")
        }).toThrowError()
    })

    test("After creation span correct status should be displayed", async()=> {
        // @ts-ignore
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=>{}} profileId={''} authId={''}/>)
        const root = component.root
        const span = await root.findByType("span")
        expect(span.children[0]).toBe("it-kamasutra.com")
    })

    test("input should transform to edit mode", async()=> {
        // @ts-ignore
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={()=>{}} profileId={''} authId={''}/>)
        const root = component.root
        const span = await root.findByType("span")
        span.props.onDoubleClick()
        const input = await root.findByType("input")
        expect(input).not.toBeNull()
        expect(input.props.value).toBe("it-kamasutra.com")
        expect( ()=> {
            // eslint-disable-next-line testing-library/await-async-query
            root.findByType("span")
        }).toThrowError()
    })

    test("Callback should be called", async ()=> {
        const mockCallback = jest.fn()
        // @ts-ignore
        const component = TestRenderer.create(<ProfileStatus status={"it-kamasutra.com"} updateStatus={mockCallback} profileId={''} authId={''}/>)
        const instance = component.getInstance()
        // @ts-ignore
        instance.onBlur()
        expect(mockCallback.mock.calls.length).toBe(1)
    })
})