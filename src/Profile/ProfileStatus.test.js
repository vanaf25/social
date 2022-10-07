import React from "react";
import ProfileStatus from "./ProfileStatus";
import {create} from "istanbul-reports";
describe("ProfileStatus component",()=>{
test("status",()=>{
const component=create(<ProfileStatus status="hello,world"/>);
const instance=component.getInstance();
 const span=instance.findByType("span")
expect(span.length).toBe("hello,world")
})
    test("span should be display",()=>{
        const component=create(<ProfileStatus status="hello,world"/>);
        const instance=component.getInstance();
        const span=instance.findByType("span")
        expect(span.length).toBe(1)
    })
});