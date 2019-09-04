import IMainState from "Pages/Main/IState";
import IMapState from "Components/Map/IState";

interface IState {
  main: IMainState;
  map: IMapState;
  // wizard: IWizardState;
  // searchMenu: ISearchMenuState;
  // company: ICompanyState;
  // employees: IEmployeeState;
  // offer: IAdjustOfferState;
  // membership: IMembershipState;
  // form: FormStateMap;
  // coverageChoices: ICoverageChoiceState;
  // calculateOffer: ICalculateOfferState;
  // companyDetails: ICompanyDetailsState;
  // employeeOfferInfo: IEmployeeOfferInfoState;
  // investmentChoice: IInvestmentChoiceState;
  // additionalProducts: IAdditionalProductsState;
  // currentPensionProvider: ICurrentPensionProviderState;
  // contactInfo: IContactInfoState;
  // proposal: IProposalState;
}

export default IState;
