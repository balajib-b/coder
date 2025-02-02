import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  MockTemplate,
  MockTemplateVersion2,
  MockTemplateVersion,
  MockTemplateVersionVariable1,
  MockTemplateVersionVariable2,
  renderWithAuth,
  MockTemplateVersionVariable5,
} from "testHelpers/renderHelpers"
import * as API from "api/api"
import i18next from "i18next"
import TemplateVariablesPage from "./TemplateVariablesPage"
import { Language as FooterFormLanguage } from "components/FormFooter/FormFooter"
import { Route } from "react-router-dom"
import * as router from "react-router"

const navigate = jest.fn()

const { t } = i18next

const validFormValues = {
  first_variable: "Hello world",
  second_variable: "123",
}

const pageTitleText = t("title", { ns: "templateVariablesPage" })

const validationRequiredField = t("validationRequiredVariable", {
  ns: "templateVariablesPage",
})

const renderTemplateVariablesPage = () => {
  return renderWithAuth(<TemplateVariablesPage />, {
    route: `/templates/${MockTemplate.name}/variables`,
    path: `/templates/:template/variables`,
    routes: (
      <Route path={`/templates/${MockTemplate.name}`} element={<></>}></Route>
    ),
  })
}

describe("TemplateVariablesPage", () => {
  it("renders with variables", async () => {
    jest.spyOn(API, "getTemplateByName").mockResolvedValueOnce(MockTemplate)
    jest
      .spyOn(API, "getTemplateVersion")
      .mockResolvedValueOnce(MockTemplateVersion)
    jest
      .spyOn(API, "getTemplateVersionVariables")
      .mockResolvedValueOnce([
        MockTemplateVersionVariable1,
        MockTemplateVersionVariable2,
      ])

    renderTemplateVariablesPage()

    const element = await screen.findByText(pageTitleText)
    expect(element).toBeDefined()

    const firstVariable = await screen.findByLabelText(
      MockTemplateVersionVariable1.name,
    )
    expect(firstVariable).toBeDefined()

    const secondVariable = await screen.findByLabelText(
      MockTemplateVersionVariable2.name,
    )
    expect(secondVariable).toBeDefined()
  })

  it("user submits the form successfully", async () => {
    jest.spyOn(API, "getTemplateByName").mockResolvedValueOnce(MockTemplate)
    jest
      .spyOn(API, "getTemplateVersion")
      .mockResolvedValueOnce(MockTemplateVersion)
    jest
      .spyOn(API, "getTemplateVersionVariables")
      .mockResolvedValueOnce([
        MockTemplateVersionVariable1,
        MockTemplateVersionVariable2,
      ])
    jest
      .spyOn(API, "createTemplateVersion")
      .mockResolvedValueOnce(MockTemplateVersion2)
    jest.spyOn(API, "updateActiveTemplateVersion").mockResolvedValueOnce({
      message: "done",
    })
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate)

    renderTemplateVariablesPage()

    const element = await screen.findByText(pageTitleText)
    expect(element).toBeDefined()

    const firstVariable = await screen.findByLabelText(
      MockTemplateVersionVariable1.name,
    )
    expect(firstVariable).toBeDefined()

    const secondVariable = await screen.findByLabelText(
      MockTemplateVersionVariable2.name,
    )
    expect(secondVariable).toBeDefined()

    // Fill the form
    const firstVariableField = await screen.findByLabelText(
      MockTemplateVersionVariable1.name,
    )
    await userEvent.clear(firstVariableField)
    await userEvent.type(firstVariableField, validFormValues.first_variable)

    const secondVariableField = await screen.findByLabelText(
      MockTemplateVersionVariable2.name,
    )
    await userEvent.clear(secondVariableField)
    await userEvent.type(secondVariableField, validFormValues.second_variable)

    // Submit the form
    const submitButton = await screen.findByText(
      FooterFormLanguage.defaultSubmitLabel,
    )
    await userEvent.click(submitButton)

    // Wait for redirect
    await waitFor(() =>
      expect(navigate).toHaveBeenCalledWith(`/templates/${MockTemplate.name}`),
    )
  })

  it("user forgets to fill the required field", async () => {
    jest.spyOn(API, "getTemplateByName").mockResolvedValueOnce(MockTemplate)
    jest
      .spyOn(API, "getTemplateVersion")
      .mockResolvedValueOnce(MockTemplateVersion)
    jest
      .spyOn(API, "getTemplateVersionVariables")
      .mockResolvedValueOnce([
        MockTemplateVersionVariable1,
        MockTemplateVersionVariable5,
      ])
    jest
      .spyOn(API, "createTemplateVersion")
      .mockResolvedValueOnce(MockTemplateVersion2)
    jest.spyOn(API, "updateActiveTemplateVersion").mockResolvedValueOnce({
      message: "done",
    })
    jest.spyOn(router, "useNavigate").mockImplementation(() => navigate)

    renderTemplateVariablesPage()

    const element = await screen.findByText(pageTitleText)
    expect(element).toBeDefined()

    const firstVariable = await screen.findByLabelText(
      MockTemplateVersionVariable1.name,
    )
    expect(firstVariable).toBeDefined()

    const fifthVariable = await screen.findByLabelText(
      MockTemplateVersionVariable5.name,
    )
    expect(fifthVariable).toBeDefined()

    // Submit the form
    const submitButton = await screen.findByText(
      FooterFormLanguage.defaultSubmitLabel,
    )
    await userEvent.click(submitButton)

    // Check validation error
    const validationError = await screen.findByText(validationRequiredField)
    expect(validationError).toBeDefined()
  })

  it("no managed variables", async () => {
    jest.spyOn(API, "getTemplateByName").mockResolvedValueOnce(MockTemplate)
    jest
      .spyOn(API, "getTemplateVersion")
      .mockResolvedValueOnce(MockTemplateVersion)
    jest.spyOn(API, "getTemplateVersionVariables").mockResolvedValueOnce([])

    renderTemplateVariablesPage()

    const element = await screen.findByText(pageTitleText)
    expect(element).toBeDefined()

    const goBackButton = await screen.findByText("Go back")
    expect(goBackButton).toBeDefined()
  })
})
