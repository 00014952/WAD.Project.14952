namespace WAD.Back._14952.Types
{
    public class ResponseResult<T>
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
        public int StatusCode { get; set; }
        public T Payload { get; set; }
    }
}
