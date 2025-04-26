import styled from 'styled-components'

const StyledLoginContainer = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: var(--spacing-sm);
  
  h1.login__title {
    font-size: clamp(4rem, 10vw, 5.5rem);
    font-weight: 900;
    line-height: 1;
    margin: 0 0 var(--spacing-xs) 0;

    @media (min-width: 768px) {
      margin: 0 0 var(--spacing-xs) -5px;
    }
  } 
  
  h2.login__subtext {
    font-size: 4/3rem;
    letter-spacing: normal;
    color: var(--light-grey);
    line-height: 1;
    margin: -10px 0 var(--spacing-xl) 0;

    @media (min-width: 768px) {
      margin: -10px 0 var(--spacing-lg) -5px;
      font-size: var(--fz-xl);
    }
  }

  div.buttons__container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }
`

export default StyledLoginContainer