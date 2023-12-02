import {mount} from "@vue/test-utils";
import SignIn from "../views/crafted/authentication/basic-flow/SignIn.vue";

const wrapper = mount(SignIn);

it("testing SignIn component to contain create an account", async () => {
    expect(wrapper.text()).toContain('Create');
})