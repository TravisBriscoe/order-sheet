import React from 'react';

const withLoading = (WrappedComponenet) => {
  const loadingScreen = (props) => {
    return (
      <> 
        {
          props.isLoading
            ? <span style={{margin: '0 auto'}}>Fetching Data. Please Wait.</span>
            : <WrappedComponenet {...props} />
        }
      </>
    )
  }
  return loadingScreen;
}

export default withLoading;