class AxiosLockManager {
  constructor() {
    this.operationLock = new Set();
  }
  private operationLock: Set<string>;

  /**
   * 使用鎖定機制執行非同步操作，防止並行執行。
   *
   * @param lockKey - 操作鎖定的唯一識別碼
   * @param operation - 在鎖定下要執行的非同步操作
   * @returns 返回一個 Promise，解析為操作結果
   * @throws {string} 當操作已被鎖定時拋出 ("等待回應中請稍後")
   * @throws 操作本身拋出的錯誤
   * ```
   */
  withLock = <T>(
    lockKey: string,
    operation: () => Promise<T>,
    showError: boolean = true,
  ): Promise<T> => {
    return new Promise(async (resolve, reject) => {
      if (this.operationLock.has(lockKey)) {
        if (showError) {
          reject(new Error("等待回應中請稍後"));
        } else {
          reject();
        }
        return;
      }

      this.operationLock.add(lockKey);

      try {
        const result = await operation();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.operationLock.delete(lockKey);
      }
    });
  };
}
export const axiosLockManager = new AxiosLockManager();
